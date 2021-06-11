import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    container: {
        width: '100%',
        margin: 'auto',
        display: 'flex',
        maxWidth: '1000px',
        justifyContent: 'flex-end'
    },
    navContainer: {
        display: 'flex',
        listStyle: 'none'
    },
    link: {
        color: '#2196f3',
        borderRadius: 25,
        padding: '10px 20px',
        textDecoration: 'none'
    },
    activeLink: {
        background: '#f1f1f1',
        border: '1px solid #ccc'
    }
}

export {
    styles
}