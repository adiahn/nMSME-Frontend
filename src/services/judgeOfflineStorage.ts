// Offline storage service for Judges Dashboard
// Handles saving draft scores to localStorage and syncing when online

export interface OfflineScore {
  applicationId: string;
  scores: {
    innovation_differentiation: number;
    market_traction_growth: number;
    impact_job_creation: number;
    financial_health_governance: number;
    inclusion_sustainability: number;
    scalability_award_use: number;
  };
  timestamp: number;
  isSynced: boolean;
}

export interface OfflineConflictDeclaration {
  has_conflict: boolean;
  conflict_type: 'personal' | 'business' | 'financial' | 'family' | 'other' | '';
  conflict_details: string;
  declaration_date: string;
  isSynced: boolean;
}

class JudgeOfflineStorage {
  private readonly SCORES_KEY = 'judgeOfflineScores';
  private readonly CONFLICT_KEY = 'judgeOfflineConflict';
  private readonly PENDING_SYNC_KEY = 'judgePendingSync';

  // Check if we're online
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Save score draft offline
  saveScoreDraft(applicationId: string, scores: any): void {
    try {
      const offlineScores = this.getOfflineScores();
      const existingIndex = offlineScores.findIndex(score => score.applicationId === applicationId);
      
      const scoreData: OfflineScore = {
        applicationId,
        scores,
        timestamp: Date.now(),
        isSynced: false
      };

      if (existingIndex >= 0) {
        offlineScores[existingIndex] = scoreData;
      } else {
        offlineScores.push(scoreData);
      }

      localStorage.setItem(this.SCORES_KEY, JSON.stringify(offlineScores));
      
      // Mark as pending sync
      this.addPendingSync('score', applicationId);
      
      console.log(`Score draft saved offline for application ${applicationId}`);
    } catch (error) {
      console.error('Failed to save score draft offline:', error);
    }
  }

  // Get all offline scores
  getOfflineScores(): OfflineScore[] {
    try {
      const stored = localStorage.getItem(this.SCORES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get offline scores:', error);
      return [];
    }
  }

  // Get offline score for specific application
  getOfflineScore(applicationId: string): OfflineScore | null {
    const offlineScores = this.getOfflineScores();
    return offlineScores.find(score => score.applicationId === applicationId) || null;
  }

  // Save conflict declaration offline
  saveConflictDeclaration(declaration: Omit<OfflineConflictDeclaration, 'isSynced'>): void {
    try {
      const conflictData: OfflineConflictDeclaration = {
        ...declaration,
        isSynced: false
      };

      localStorage.setItem(this.CONFLICT_KEY, JSON.stringify(conflictData));
      
      // Mark as pending sync
      this.addPendingSync('conflict', 'conflict_declaration');
      
      console.log('Conflict declaration saved offline');
    } catch (error) {
      console.error('Failed to save conflict declaration offline:', error);
    }
  }

  // Get offline conflict declaration
  getOfflineConflictDeclaration(): OfflineConflictDeclaration | null {
    try {
      const stored = localStorage.getItem(this.CONFLICT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to get offline conflict declaration:', error);
      return null;
    }
  }

  // Add item to pending sync queue
  private addPendingSync(type: 'score' | 'conflict', id: string): void {
    try {
      const pending = this.getPendingSync();
      const syncItem = { type, id, timestamp: Date.now() };
      
      // Remove duplicate if exists
      const filtered = pending.filter(item => !(item.type === type && item.id === id));
      filtered.push(syncItem);
      
      localStorage.setItem(this.PENDING_SYNC_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to add pending sync:', error);
    }
  }

  // Get pending sync items
  getPendingSync(): Array<{ type: 'score' | 'conflict'; id: string; timestamp: number }> {
    try {
      const stored = localStorage.getItem(this.PENDING_SYNC_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get pending sync:', error);
      return [];
    }
  }

  // Mark score as synced
  markScoreSynced(applicationId: string): void {
    try {
      const offlineScores = this.getOfflineScores();
      const scoreIndex = offlineScores.findIndex(score => score.applicationId === applicationId);
      
      if (scoreIndex >= 0) {
        offlineScores[scoreIndex].isSynced = true;
        localStorage.setItem(this.SCORES_KEY, JSON.stringify(offlineScores));
        
        // Remove from pending sync
        this.removePendingSync('score', applicationId);
        
        console.log(`Score marked as synced for application ${applicationId}`);
      }
    } catch (error) {
      console.error('Failed to mark score as synced:', error);
    }
  }

  // Mark conflict declaration as synced
  markConflictSynced(): void {
    try {
      const conflict = this.getOfflineConflictDeclaration();
      if (conflict) {
        conflict.isSynced = true;
        localStorage.setItem(this.CONFLICT_KEY, JSON.stringify(conflict));
        
        // Remove from pending sync
        this.removePendingSync('conflict', 'conflict_declaration');
        
        console.log('Conflict declaration marked as synced');
      }
    } catch (error) {
      console.error('Failed to mark conflict declaration as synced:', error);
    }
  }

  // Remove item from pending sync
  private removePendingSync(type: 'score' | 'conflict', id: string): void {
    try {
      const pending = this.getPendingSync();
      const filtered = pending.filter(item => !(item.type === type && item.id === id));
      localStorage.setItem(this.PENDING_SYNC_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to remove pending sync:', error);
    }
  }

  // Clear all offline data (for logout)
  clearAllOfflineData(): void {
    try {
      localStorage.removeItem(this.SCORES_KEY);
      localStorage.removeItem(this.CONFLICT_KEY);
      localStorage.removeItem(this.PENDING_SYNC_KEY);
      console.log('All offline data cleared');
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  }

  // Get storage usage info
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      const scores = localStorage.getItem(this.SCORES_KEY) || '';
      const conflict = localStorage.getItem(this.CONFLICT_KEY) || '';
      const pending = localStorage.getItem(this.PENDING_SYNC_KEY) || '';
      
      const used = new Blob([scores + conflict + pending]).size;
      const available = 5 * 1024 * 1024; // 5MB localStorage limit
      const percentage = (used / available) * 100;
      
      return { used, available, percentage };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  // Check if there are unsynced items
  hasUnsyncedItems(): boolean {
    const pending = this.getPendingSync();
    return pending.length > 0;
  }

  // Get unsynced scores count
  getUnsyncedScoresCount(): number {
    const offlineScores = this.getOfflineScores();
    return offlineScores.filter(score => !score.isSynced).length;
  }

  // Simulate sync attempt (in real app, this would call the API)
  async attemptSync(): Promise<{ success: boolean; syncedItems: number; errors: string[] }> {
    if (!this.isOnline()) {
      return { success: false, syncedItems: 0, errors: ['No internet connection'] };
    }

    try {
      const pending = this.getPendingSync();
      let syncedItems = 0;
      const errors: string[] = [];

      // Simulate API calls for each pending item
      for (const item of pending) {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 100));
          
          if (item.type === 'score') {
            this.markScoreSynced(item.id);
          } else if (item.type === 'conflict') {
            this.markConflictSynced();
          }
          
          syncedItems++;
        } catch (error) {
          errors.push(`Failed to sync ${item.type}: ${error}`);
        }
      }

      return { success: true, syncedItems, errors };
    } catch (error) {
      return { success: false, syncedItems: 0, errors: [String(error)] };
    }
  }
}

// Export singleton instance
export const judgeOfflineStorage = new JudgeOfflineStorage();

// Export types for use in components
export type { OfflineScore, OfflineConflictDeclaration };

