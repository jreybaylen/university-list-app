import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    container: {
        width: '100%',
        margin: 'auto',
        maxWidth: 1000
    },
    noResult: {
        fontWeight: 500,
        textAlign: 'center'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        color: '#fff',
        border: 'none',
        background: '#f44336',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    }
}

export {
    styles
}