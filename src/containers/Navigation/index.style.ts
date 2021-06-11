import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    container: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',
        display: 'flex',
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
    },
    name: {
        fontWeight: 500,
        margin: '0 15px'
    },
    signOut: {
        marginLeft: 5,
        fontWeight: 500,
        paddingLeft: 20,
        cursor: 'pointer',
        borderLeft: '2px solid #ccc'
    }
}

export {
    styles
}