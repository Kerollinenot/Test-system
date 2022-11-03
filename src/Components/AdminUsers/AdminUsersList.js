import AdminUsersListItem from './AdminUsersListItem'

export default function AdminUsersList(props) {

    const elements = props.usersList.map((item, index) => {
        const { id, ...itemProps } = item;
        return (
            <AdminUsersListItem
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
