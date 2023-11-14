/* eslint-disable no-undef */
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import imagemPerfil from "../assets/imagem-perfil.svg"

import { Comment } from "./Comment";

import styles from "./Post.module.css"
import { FormEvent, useState } from "react";

interface Author { //aqui estamos tipando o author, falando de que cada tipo é os parametros dele
    name: string,
    role: string,
    avatarUrl: string
}

interface PostProps { //aqui tipando o componente Post, então por isso o nome PostProps, falando de cada tipo de parametro ele usa
    author: Author;
    content: string;
    publishedAt: Date
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [comments, setComments] = useState([//estado de comentários comments lista de comentarios e setComments é a função que armazena eles
        "Post muito bacana heim?"
    ])
    const [newCommentText, setNewCommentText] = useState("") //estado que cuida da textarea ela zerando depois de digitada (todo o estado que for iniciado precisa ser com algo, se não, com um []vazio)

    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'ás' HH:mm'h'", {//função de formatar data com a lib date-fns
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleNewComment(event: FormEvent) {//evento sendo disparado pelo formulario, sendo assim importamos do react esse FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText])//array sendo usado com spread operator que são os ... e adicionando o estado que ficou salvo a ultima mudança na textearea digitada newCommentText
        setNewCommentText('')//estado que armazena o conteudo digitado na textearea voltando ele ao valor inicial que é uma string vazia
        //estamos aqui usando a programação declarativa, o que exige o final, independente do processo, sem passo a passo!
    }

    function handleNewCommentChange(event: FormEvent) {//evento sendo disparado pelo campo dentro do formulario, sendo assim precisamos avisar ao ts qual elemento ele esta sendo disparado, como se fosse um parametro para o typescript os generics e eles tem essa maneira de passar <HTMLTextAreaElement>
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value)//estado monitorando a textarea e pegando o value digitando no input textarea
    }

    function handleNewCommentInvalid(event) {
        event.target.setCustomValidity("Esse campo é obrigatório!")
    }

    function deleteComment(commentToDelete) {//função de deletar comentário
        const commentsWithoutDeletedOne = comments.filter(comment => {//lista de comentário sem o comentário que eu ja deletei
            return comment != commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.cover} src={imagemPerfil} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>Web Developer</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateFormatted}
                </time>
            </header>
            <div className={styles.content}>
                {content.map(line => {//map iteirando os arrays com os paragrafos e os links usando if else if
                    if (line.type === "paragraph") {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === "link") {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleNewComment} className={styles.comentForm}> {/*formulário sendo vigiado pelo handleNewComment */}
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}//o valor da textarea é o valor que esse estado newCommentText vai armazenar, toda vez que o estado mudar essa textarea vai refletir a ação
                    onChange={handleNewCommentChange}//monitorando mudanças do estado da text area, me avisando e mostrando em tela no console.log
                    onInvalid={handleNewCommentInvalid}//mensagem que aparece em portugues invalidando o campo se estiver vazio
                    required//não deixa ir o comentário vazio
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article>
    )
}
