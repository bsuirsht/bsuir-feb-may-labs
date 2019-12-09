export function awaitify(action) {
    return new Promise((resolve, reject) => {
        action(resolve, reject);
    });
}
