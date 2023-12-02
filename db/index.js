export const users = {
  getUser: async (id) => {
    return usersData[id] ?? null;
  },
};

const usersData = {
  1: { name: "Seje Simon", age: 33 },
  2: { name: "Nice Niko", age: 32 },
};
