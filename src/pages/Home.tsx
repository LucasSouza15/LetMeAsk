import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import {Button} from '../components/Button';

import '../styles/auth.scss';



//webpack (snowpack, vite, ...)
export function Home() {
  const history = useNavigate();
  const {user, signInWithGoogle} = useAuth()

  async function handCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }
    console.log(user)
    history('/rooms/new');
  }
  return (
    
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main className="main-content">
        <img src={logoImg} alt="LetMeAsk" />
        <button onClick={handCreateRoom} className="create-room">
          <img src={googleIconImg} alt="Logo do google" />
          Crie sua sala com o Google
        </button>
        <div className="separator">ou entre em uma sala</div>
        <form action="">
          <input 
            type="text"
            placeholder='Digite o código da sala'
          />
          <Button type='submit'>
            Entrar na sala
          </Button>
        </form>
      </main>
    </div>
  )
}