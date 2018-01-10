import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from './actions'
import { State } from './types'
import RSA from 'react-simple-auth'
import { microsoftProvider } from './providers/microsoft'

class Login extends React.Component<Props, {}> {
    async onClickLogin() {
        try {
            const session = await RSA.acquireTokenAsync(microsoftProvider)
            const { login } = this.props
            login(session.decodedIdToken.oid, session.decodedIdToken.name)
        } catch (error) {
            throw error
        }
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h1>Login</h1>
                <div>
                    IsLoggedIn {user.isLoggedIn ? 'true' : 'false'}
                </div>
                <button type="button" onClick={() => this.onClickLogin()}>Login</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        login
    }, dispatch)
}
const mapStateToProps = (state: State) => {
    return {
        user: state.user
    }
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Login);
