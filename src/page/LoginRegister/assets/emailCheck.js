const CheckEmail = (item) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item);

} 
const CheckEmty = (item) => {
    if(item === '') {
        return false;
    }
    return true;
}
export {CheckEmail,CheckEmty}