import Markdown from "react-markdown";
import styles from './styled-markdown.module.scss';

export function StyledMarkdown({children}: {children: string}) {
    return (
        <div className={styles.container}>
            <Markdown>{children}</Markdown>
        </div>
    )
}