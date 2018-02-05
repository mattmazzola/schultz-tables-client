import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import * as models from '../types/models'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, getUserScoresThunkAsync } from '../actions'
import { ReduxState } from '../types'
import Score from '../components/Score'
import './User.css'

interface ReceivedProps extends RouteComponentProps<any> {
}

interface State {
    user: models.IUser | null
    isLoading: boolean
}

const initialState: State = {
    user: null,
    isLoading: false
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

        if (this.props.profile.length === 0) {
            this.setState({
                isLoading: true
            })
            this.props.getUserScoresThunkAsync(this.props.user.id)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.state.isLoading === true && nextProps.profile.length > 0) {
            this.setState({
                isLoading: false
            })
        }
    }

    onClickLogout = () => {
        this.props.logout()
    }

    render() {
        const { user } = this.props
        const routerUser = this.state.user
        return <div>
            <h1>{user.name}</h1>
            {routerUser && routerUser.id === user.id && <button className="button-logout" type="button" onClick={this.onClickLogout}>Logout</button>}
            <h2>User Scores</h2>
            <div className="scores">
                {this.state.isLoading
                    ? <div className="score-loading">Loading...</div>
                    : this.props.profile.map(score => <Score key={score.id} score={score} />)}
            </div>
        </div>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        logout,
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