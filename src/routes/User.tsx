import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import * as models from '../types/models'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, getTableTypesThunkAsync, getUserScoresThunkAsync } from '../actions'
import { ReduxState } from '../types'
import Score from '../components/Score'
import './User.css'
import { getUserTableTypeKey } from '../services/utilities';

interface ReceivedProps extends RouteComponentProps<any> {
}

interface State {
    user: models.IUser | null
    isLoading: boolean
    tableTypeIdSelected: string
}

const initialState: State = {
    user: null,
    isLoading: false,
    tableTypeIdSelected: ''
}

export class User extends React.Component<Props, State> {
    state = initialState

    componentWillMount() {
        const { history, location } = this.props
        const user: models.IUser | null = location.state && location.state.user

        if (!user) {
            history.replace('/')
            return
        }

        this.setState({
            user
        })

        if (this.props.profile.tableTypes.length === 0) {
            this.setState({
                isLoading: true
            })
            this.props.getTableTypesThunkAsync()
        }
        else {
            this.setState({
                tableTypeIdSelected: this.props.profile.tableTypes[0].id
            })
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.state.isLoading === true && nextProps.profile.tableTypes.length > 0) {
            const tableTypeIdSelected = nextProps.profile.tableTypes[0].id
            this.setState({
                tableTypeIdSelected,
                isLoading: false
            })

            if (!this.props.profile.scoresByUserAndType.get(tableTypeIdSelected)) {
                this.props.getUserScoresThunkAsync(tableTypeIdSelected, this.props.user.id)
            }
        }
    }

    onChangeTableType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableTypeIdSelected = event.target.value
    
        const key = getUserTableTypeKey(this.props.user.id, tableTypeIdSelected)
        const existingUserScores = this.props.profile.scoresByUserAndType.get(key)
        if (!existingUserScores || existingUserScores.scores.length === 0) {
          this.props.getUserScoresThunkAsync(tableTypeIdSelected, this.props.user.id)
        }
        
        this.setState({
          tableTypeIdSelected
        })
      }

    onClickLogout = () => {
        this.props.logout()
    }

    render() {
        const { user, profile } = this.props
        const userTableKey = getUserTableTypeKey(user.id, this.state.tableTypeIdSelected)
        const routerUser = this.state.user
        return <div>
            <h1>{user.name}</h1>
            {routerUser && routerUser.id === user.id && <button className="button-logout" type="button" onClick={this.onClickLogout}>Logout</button>}
            <h2>User Scores</h2>
            <div className="scores-types">
                {this.props.profile.tableTypes.length === 0
                    ? <div>Loading...</div>
                    : <select onChange={this.onChangeTableType} value={this.state.tableTypeIdSelected}>
                        {this.props.profile.tableTypes.map(tableType =>
                            <option key={tableType.id} value={tableType.id}>{tableType.width} x {tableType.height} - {tableType.properties
                                .filter(({ key }) => {
                                    console.log(key)
                                    return ['symbols', 'fontColor', 'cellColor'].includes(key)
                                })
                                .map(({ value }) => `${value}`)
                                .join(', ')}
                            </option>
                        )}
                    </select>}
            </div>
            <div className="scores">
                {this.state.isLoading
                    ? <div className="score-loading">Loading...</div>
                    : profile.scoresByUserAndType.has(userTableKey) && profile.scoresByUserAndType.get(userTableKey)!.scores.map(score => <Score key={score.id} score={score} />)}
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        logout,
        getTableTypesThunkAsync,
        getUserScoresThunkAsync
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        user: state.user,
        profile: state.profile
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps & ReceivedProps & RouteComponentProps<any>

export default connect<typeof stateProps, typeof dispatchProps, ReceivedProps & RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(User)