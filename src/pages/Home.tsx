import { useHistory } from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';

export function Home() {

    const { user, signIWithGoogle } = useAuth()

    const history = useHistory()

    async function handleCreateRoom() {
        if (!user) {
            await signIWithGoogle()
        }
        history.push('/rooms/new')
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A Ao vivo</strong>
                <p>Tire suas dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className='create-room'
                        onClick={handleCreateRoom}
                    >
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala
                    </button>
                    <div className='separator'>
                        ou entre em uma sala
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>

                    </form>
                </div>
            </main>
        </div>
    )

}