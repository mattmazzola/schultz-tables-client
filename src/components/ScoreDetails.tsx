import * as React from 'react'
import { returntypeof } from 'react-redux-typescript';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ReduxState } from '../types'
import * as models from '../types/models'
import * as moment from 'moment'
import { getTimeDifference } from '../services/utilities'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import './ScoreDetails.css'

interface ReceivedProps {
    durationMilliseconds: number
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
        const data = scoreDetails.sequence
            .filter(s => s.correct)
            .map<any>(s => (
                { name: s.cell.text, time: getTimeDifference(s.time as any, scoreDetails.startTime as any) }
            ))
        const maxYAxis = Math.ceil(this.props.durationMilliseconds/1000)
        const horizontalPoints = Array(maxYAxis).fill(0).map((_, i) => i + 1)

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
                            <div>
                                <i className="material-icons">access_time</i>
                            </div>

                            {scoreDetails.sequence.map((o,i,seq) => {
                                const totalDuration = getTimeDifference(o.time as any, scoreDetails.startTime as any)
                                const duration = i === 0
                                    ? getTimeDifference(o.time as any, scoreDetails.startTime as any)
                                    : getTimeDifference(o.time as any, seq[i-1].time as any)


                                return (
                                    <React.Fragment key={o.time as any}>
                                        <div>
                                            {o.correct
                                                ? <i className="material-icons correct">done</i>
                                                : <i className="material-icons incorrect">error_outline</i>}
                                        </div>
                                        <div>{o.cell.text}</div>
                                        <div>+{duration}</div>
                                        <div>+{totalDuration}</div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </dd>
                    <dt>Timeline:</dt>
                    <dd>
                        <LineChart className="score-details__line-chart" width={450} height={400} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} >
                            <Line type="monotone" dataKey="time" stroke="#8884d8" />
                            <XAxis dataKey="name" ticks={tableLayout.expectedSequence} interval={0} />
                            <YAxis dataKey="time" domain={[0, maxYAxis]} ticks={horizontalPoints}  />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                        </LineChart>
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