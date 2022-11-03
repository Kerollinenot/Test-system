import AdminTopicListItem from './AdminTopicListItem'

export default function AdminTopicList(props) {

    const elements = props.topicList.map((item, index) => {
        const { id, ...itemProps } = item;
        return (
            <AdminTopicListItem
                key={item.id}
                id={item.id}
                index={index + 1}
                updateList={props.updateList}
                openEditModal={props.openEditModal}
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

