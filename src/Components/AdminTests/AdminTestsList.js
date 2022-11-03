import AdminTestsListItem from './AdminTestsListItem'

export default function AdminTestsList(props) {

    const elements = props.testsList.map((item, index) => {
        const { id, ...itemProps } = item;
        return (
            <AdminTestsListItem
                key={item.id}
                id={item.id}
                index={index + 1}
                updateList={props.updateList}
                {...itemProps}
            />
        )
    })

    return (
        <>
            {elements}
        </>
    )
}
