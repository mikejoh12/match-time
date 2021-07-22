import { LandingLoggedIn } from "./LandingLoggedIn";
import { LandingNotLoggedIn } from './LandingNotLoggedIn'
import { useAuth } from '../../hooks/useAuth'

export const Landing = () => {
    const { user } = useAuth()

    return (
            <div>
                {user ?
                    <LandingLoggedIn />
                    :
                    <LandingNotLoggedIn />
                }
            </div>
    )
}
