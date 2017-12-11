// @flow

import {connect} from 'react-redux'
import ListClass from '../../components/ListClass/ListClass'
import * as ClassSelectors from "../../reducers/ClassReducer";
import * as ClassActions from "../../actions/ClassActions";

const mapStateToProps = (state) => ({
    classes: ClassSelectors.getClasses(state),
    fetchStatus: ClassSelectors.getFetchStatus(state)
});

const mapDispatchToProps = {
    fetchClasses: ClassActions.fetchClasses
};

const ListClassContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListClass);

export default ListClassContainer;
