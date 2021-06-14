import { StypesProps } from '@interface/style.interface'

const container = {
    width: '100%',
    margin: 'auto',
    maxWidth: 1000
}
const styles: StypesProps = {
    searchBar: {
        paddingBottom: 15,
        boxShadow: 'rgb(0 0 0 / 20%) 0px 1px 2px 0px'
    },
    searchContainer: container,
    container: {
        ...container,
        marginBottom: 100
    }
}

export {
    styles
}