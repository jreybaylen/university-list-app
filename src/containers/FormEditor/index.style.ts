import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    container: {
        padding: 30,
        width: '90%',
        maxWidth: 400,
        borderRadius: 5,
        margin: '10% auto',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 10px 15px 0px'
    },
    heading: {
        fontWeight: 500,
        marginBottom: 30
    },
    formGroup: {
        marginBottom: 15
    },
    button: {
        width: '100%',
        color: '#fff',
        border: 'none',
        borderRadius: 25,
        background: '#1a73e8'
    }
}

export {
    styles
}