import { StypesProps } from '@interface/style.interface'

const styles: StypesProps = {
    university: {
        width: '500px',
        height: '500px'
    },
    country: {
        fontSize: '.85rem',
        margin: '0 0 8px 10px'
    },
    name: {
        fontWeight: 500,
        color: '#3e3e3e',
        margin: '0 0 15px 10px'
    },
    websiteContainer: {
        display: 'flex'
    },
    website: {
        marginRight: 10,
        borderRadius: 4,
        color: '#2196f3',
        fontSize: '.95rem',
        padding: '6px 10px',
        width: 'max-content',
        textDecoration: 'none'
    }
}

export {
    styles
}