// stores/categorie.js
import { defineStore } from "pinia";
import { getData } from "#imports";

export const useTagsStore = defineStore("tags", {
  state: () => ({
    tags: [], // Initial state for your tags array
    fetched: false,
  }),

  actions: {
    async getTags() {
      if (this.fetched && this.tags.length > 0) {
        return this.tags;
      }

      try {
        const res = await getData("tags");
        this.tags = res?.data || []; 
        this.fetched = true;
        return this.tags;
      } catch (err) {
        console.error("Failed to fetch tags", err);
        throw err;
      }
    },
  },
});
