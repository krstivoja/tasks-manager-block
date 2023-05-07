import { useBlockProps } from '@wordpress/block-editor';
import TaskList from './tasksList.js';

const Save = (props) => {
    const { attributes } = props;
    const { backgroundColor, tasksListBackgroundColor, cardBackgroundColor } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <TaskList
                backgroundColor={backgroundColor}
                tasksListBackgroundColor={tasksListBackgroundColor}
                cardBackgroundColor={cardBackgroundColor}
            />
        </div>
    );
};

export default Save;
