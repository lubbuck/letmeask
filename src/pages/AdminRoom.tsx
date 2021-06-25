import { useHistory, useParams } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from "../components/Question"
// import { useAuth } from "../hooks/useAuth"
import '../styles/room.scss'
import { useRoom } from "../hooks/useRoom"
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import { database } from "../services/firebase"
type RoomParams = {
    id: string;
}

export function AdminRoom() {

    // const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomID = params.id
    const history = useHistory()
    const { questions, title } = useRoom(roomID)

    async function handleEndRoom() {
        await database.ref('rooms/' + roomID).update({
            endedAt: new Date(),
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questioId: string) {
        if (window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
            await database.ref('rooms/' + roomID + '/questions/' + questioId).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questioId: string) {
        await database.ref('rooms/' + roomID + '/questions/' + questioId).update({
            isAnswered: true
        })
    }

    async function handleHighLightQuestion(questioId: string) {
        await database.ref('rooms/' + roomID + '/questions/' + questioId).update({
            isHighlighted: true
        })
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeas" />
                    <div>
                        <RoomCode code={roomID} />
                        <Button isOutlined={true} onClick={() => handleEndRoom()}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {
                        questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)
                    }

                </div>
                <div className="question-list">
                    {
                        questions.map(question => (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {
                                    !question.isAnswered && (

                                        <>
                                            <button
                                                type='button'
                                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                            >
                                                <img src={checkImg} alt="marcar pergunta como respondida" />
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => handleHighLightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Dar destaque a pergunta" />
                                            </button>
                                        </>
                                    )
                                }
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        ))
                    }
                </div>
            </main>
        </div >
    )
}