import { create } from "zustand";

interface LeadState {
  selectedLead: any;

  setSelectedLead: (lead: any) => void;
}

export const useLeadStore =
  create<LeadState>((set) => ({
    selectedLead: null,

    setSelectedLead: (lead) =>
      set({
        selectedLead: lead,
      }),
  }));