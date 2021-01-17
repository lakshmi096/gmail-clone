import React from 'react';
import "./Section.css";

const Section = ({Icon, title, color, selected, handleSetSection, unread }) => {
    const selectedTitleClass = `section--${title}`
    return (
        <div className={`section ${selected && "section--active"}  ${selected && selectedTitleClass}`}
            style={{ borderBottom: `3px solid ${color}` }}
            onClick = {() => handleSetSection(title)}>
                <Icon/>
                <h4>{title}</h4> <span>({unread(title)})</span>
        </div>
    )
}

export default Section;
