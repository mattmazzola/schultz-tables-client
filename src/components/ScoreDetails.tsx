import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ReduxState } from '../types'
import * as models from '../types/models'
import * as moment from 'moment'
import { getTimeDifference } from '../services/utilities'
import './ScoreDetails.css'

interface ReceivedProps {
    scoreDetails: models.IScoreDetails
}

interface State {
}

const initialState: State = {
}

class ScoreDetails extends React.Component<Props, State> {
    state = initialState

    render() {
        const { scoreDetails } = this.props
        const { tableLayout, tableType } = scoreDetails
        return (
            <div>
                <dl>
                    <dt><i className="material-icons">border_all</i> Size:</dt>
                    <dd>{tableLayout.width}w &times; {tableLayout.height}h</dd>
                    <dt><i className="material-icons">format_list_bulleted</i> Properties:</dt>
                    <dd>
                        <dl>
                            {tableType.properties.map(({ key, value }) =>
                                <React.Fragment key={key}>
                                    <dt>{key}:</dt>
                                    <dd>{value}</dd>
                                </React.Fragment>
                            )}
                        </dl>
                    </dd>
                    <dt><i className="material-icons">access_time</i> Start Time:</dt>
                    <dd>{moment(scoreDetails.startTime).format('MMMM D, h:mm:ss a')}</dd>
                    <dt><i className="material-icons">access_time</i> End Time:</dt>
                    <dd>{moment(scoreDetails.endTime).format('MMMM D, h:mm:ss a')}</dd>
                    <dt><i className="material-icons">format_list_numbered</i> Sequence</dt>
                    <dd>
                        <div className="sequence">
                            <div>
                                <i className="material-icons">playlist_add_check</i>
                            </div>
                            <div>
                                <i className="material-icons">translate</i>
                            </div>
                            <div>
                                <i className="material-icons">access_time</i>
                            </div>

                            {scoreDetails.sequence.map(seq => {
                                const duration = getTimeDifference(seq.time as any, scoreDetails.startTime as any)
                                return (
                                    <React.Fragment key={seq.time as any}>
                                        <div>
                                            {seq.correct
                                                ? <i className="material-icons correct">done</i>
                                                : <i className="material-icons incorrect">error_outline</i>}
                                        </div>
                                        <div>{seq.cell.text}</div>
                                        <div>+{duration}</div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </dd>
                </dl>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
    }
}

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps & ReceivedProps;

export default connect<typeof stateProps, typeof dispatchProps, ReceivedProps>(mapStateToProps, mapDispatchToProps)(ScoreDetails)