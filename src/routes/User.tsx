import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import * as models from '../types/models'
import './User.css'

interface Props extends RouteComponentProps<any> {
}

interface State {
    user: models.IUser
}

export default class User extends React.Component<Props, State> {
    componentWillMount() {
        console.log(`props: `, this.props)
        const { history, location } = this.props
        const user: models.IUser | null = location.state && location.state.user

        if(!user) {
            history.replace('/')
            return
        }

        this.setState({
            user
        })
    }

    render() {
        const { user } = this.state
        return <div>
            <dl className="user-properties">
                <dt>Name:</dt><dd>{user.name}</dd>
                <dt>Email:</dt><dd>{user.email}</dd>
            </dl>
        </div>
    }
}