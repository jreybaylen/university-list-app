import univBGSrc from '@assets/univ-bg.jpg'
import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    container: {
        padding: '100px 0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${ univBGSrc })`
    },
    banner: {
        margin: '10% 0'
    },
    heading: {
        width: '40%',
        color: '#fff',
        margin: 'auto',
        padding: '3% 0',
        fontWeight: 500,
        borderRadius: 5,
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 8px 0px'
    },
    information: {
        width: '90%',
        margin: 'auto',
        maxWidth: '1200px'
    }
}

export {
    styles
}