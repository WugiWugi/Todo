import '../pages-css/Notes.css'

function List () {

}

function ContentsOfNote () {
    return (
        <li></li>
    )
}


function Notes() {

    return (
        <main className="main">
            <div className="main__container">
                <div className="main__notes">
                    <ul className="main__list">
                        <li className="list__list-item"></li>
                    </ul>
                    <button className="list__btn">Create list</button>
                </div>
                <div className="child-related"></div>
            </div>
        </main>
    )
}

export { Notes }