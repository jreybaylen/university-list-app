import univBGSrc from '@assets/univ-bg.jpg'
import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    back: {
        top: 20,
        left: 20,
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '25px',
        padding: '10px 20px',
        position: 'absolute',
        border: '1px solid #fff',
        background: 'rgba(0, 0, 0, 0.5)'
    },
    container: {
        marginBottom: 50,
        padding: '150px 0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0px 0px 15px 5px #ccc',
        backgroundImage: `url(${ univBGSrc })`
    },
    banner: {
        margin: '10% 0'
    },
    heading: {
        width: '80%',
        color: '#fff',
        margin: 'auto',
        fontWeight: 500,
        borderRadius: 5,
        maxWidth: '1000px',
        textAlign: 'center',
        padding: '30px 15px',
        border: '2px solid #fff',
        background: 'rgba(0, 0, 0, 0.6)',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 8px 0px'
    },
    information: {
        width: '90%',
        margin: 'auto',
        maxWidth: '1000px'
    }
}

export {
    styles
}