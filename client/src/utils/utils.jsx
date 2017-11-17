export const  bindActionCreators = (dispatch, actionCreators) => {
    const bound = {};

    Object.keys(actionCreators).forEach(key => {
        bound[key] = function () {
            dispatch(actionCreators[key].apply(null, arguments))
        }
    });

    return bound;
};