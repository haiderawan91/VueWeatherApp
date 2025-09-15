export const piniaPersist = ({ store }) => {
    const storedState = localStorage.getItem(store.$id);
    if (storedState) {
        store.$patch(JSON.parse(storedState));
    }
    
    store.$subscribe((mutation, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state));
    });
};
