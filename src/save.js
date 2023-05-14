import { useBlockProps } from '@wordpress/block-editor';
import TaskList from './tasksList.js';

const Save = (props) => {
    const { attributes } = props;
    const { 
        backgroundColor, 
        tasksListBackgroundColor, 
        cardBackgroundColor, 
        paddingSize, 
        gapSize, 
        spaddingSize, 
        sgapSize, 
    } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <TaskList
                backgroundColor={backgroundColor}
                tasksListBackgroundColor={tasksListBackgroundColor}
                cardBackgroundColor={cardBackgroundColor}
                paddingSize={paddingSize}
                gapSize={gapSize}
                spaddingSize={spaddingSize}
                sgapSize={sgapSize}
            />
        </div>
    );
};

export default Save;
