// @flow

import {connect} from 'react-redux'
import CreateQCM from "../../components/CreateQCM/CreateQCM";
import * as QCMSelectors from "../../reducers/QCMReducer";
import * as QCMActions from "../../actions/QCMActions";

const mapStateToProps = (store, props) => ({
    classId: props.classId,
    postStatus: QCMSelectors.getPostStatus(store)
});

const mapDispatchToProps = {
    onPostQCM: QCMActions.postQCM
};

const CreateQCMContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateQCM);

export default CreateQCMContainer;
