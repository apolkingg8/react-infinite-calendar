/* eslint-disable sort-keys */
import React from 'react';
import {addDecorator, storiesOf} from '@kadira/storybook';
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withDateSelection,
    withKeyboardSupport,
    withMultipleDates,
    withRange,
} from '../';
import styles from './stories.scss';

// Date manipulation utils
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import endOfMonth from 'date-fns/end_of_month';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import subMonths from 'date-fns/sub_months';

const CenterDecorator = story => <div className={styles.center}>{story()}</div>;
addDecorator(CenterDecorator);

const today = new Date();

/*function makePath() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 50; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

window.testObj = {path: 'asddasdasd/ad/as/das/d/asd/asdd/asd/sa', rate: 1.544645466546}
window.testArr = []

for(var i=0; i<100000; i++) {
    window.testArr.push({
        path: makePath(),
        previewPath: makePath(),
        rate: Math.random(),
        lat: Math.random(),
        lng: Math.random(),
    })
}*/

storiesOf('Basic settings', module)
    .add('Default Configuration', () => <InfiniteCalendar/>)
    .add('Date Hint', () => (
        <InfiniteCalendar
            renderDateHint={(date, className)=> {
                var randomNum = Math.floor(Math.random() * 20)
                return <span className={className}>{randomNum || ''}</span>
            }}
        />
    ))
    .add('Initially Selected Date', () => <InfiniteCalendar selected={addDays(today, 5)}/>)
    .add('Blank Initial State', () => <InfiniteCalendar selected={null}/>)
    .add('Min Date', () => (
        <InfiniteCalendar
            min={subMonths(today, 1)} // Minimum month to render
            minDate={addDays(today, 1)} // Minimum selectable date
            selected={addDays(today, 5)}
        />
    ))
    .add('Max Date', () => (
        <InfiniteCalendar
            max={endOfMonth(addMonths(today, 1))} // Maximum rendered month
            maxDate={today} // Maximum selectable date
        />
    ))
    .add('Disable Specific Dates', () => (
        <InfiniteCalendar
            disabledDates={[-10, -5, -6, 5, 6, 7, 2].map(amount =>
                addDays(today, amount)
            )}
        />
    ))
    .add('Disable Specific Weekdays', () => (
        <InfiniteCalendar disabledDays={[0, 6]}/>
    ));

class Parent extends React.Component {

    render() {
        return (
            <div>
                <InfiniteCalendar
                    height={window.innerHeight - 150}
                    selected={[]}
                    interpolateSelection={defaultMultipleDateInterpolation}
                    Component={withMultipleDates(Calendar)}
                    onSelect={()=>{this.forceUpdate()}}
                />
            </div>
        )
    }
}

storiesOf('Higher Order Components', module)
    .add('Range selection', () => (
        <InfiniteCalendar
            selected={{
                start: addDays(new Date(), 2),
                end: addDays(new Date(), 17),
            }}
            locale={{
                headerFormat: 'MMM Do',
            }}
            Component={withRange(withKeyboardSupport(Calendar))}
        />
    ))
    .add('Multiple date selection', () => {
        return (
            <InfiniteCalendar
                height={window.innerHeight - 150}
                selected={[]}
                interpolateSelection={defaultMultipleDateInterpolation}
                Component={withMultipleDates(Calendar)}
            />
        );
    })
    .add('Keyboard Support', () => {
        return <InfiniteCalendar Component={withDateSelection(withKeyboardSupport(Calendar))}/>;
    })
    .add('Update parent component', ()=> {
        return (
            <Parent/>
        )
    });

storiesOf('Internationalization', module)
    .add('Locale', () => (
        <InfiniteCalendar
            locale={{
                blank: 'Aucune date sélectionnée',
                headerFormat: 'dddd, D MMM',
                locale: require('date-fns/locale/fr'),
                todayLabel: {
                    long: "Aujourd'hui",
                    short: 'Auj.',
                },
                weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            }}
        />
    ))
    .add('First Day of the Week', () => (
        <InfiniteCalendar
            locale={{
                weekStartsOn: 1,
            }}
        />
    ));

storiesOf('Customization', module)
    .add('Theming', () => (
        <InfiniteCalendar
            theme={{
                floatingNav: {
                    background: 'rgba(105, 74, 228, 0.91)',
                    chevron: '#FFA726',
                    color: '#FFF',
                },
                headerColor: 'rgb(127, 95, 251)',
                selectionColor: 'rgb(146, 118, 255)',
                textColor: {
                    active: '#FFF',
                    default: '#333',
                },
                weekdayColor: 'rgb(146, 118, 255)',
            }}
        />
    ))
    .add('Flexible Size', () => (
        <InfiniteCalendar
            width={'94%'}
            height={window.innerHeight - 147}
            rowHeight={70}
        />
    ))
    .add('Select Year First', () => (
        <InfiniteCalendar display={'years'} selected={null}/>
    ))
    .add('Dynamic Selection Color', () => (
        <InfiniteCalendar
            selected={addDays(today, -1)}
            theme={{
                selectionColor: date => {
                    return isBefore(date, today) ? '#EC6150' : '#559FFF';
                },
            }}
        />
    ));

storiesOf('Display Options', module)
    .add('Landscape Layout', () => (
        <InfiniteCalendar
            displayOptions={{
                layout: 'landscape',
            }}
            width={600}
            height={350}
        />
    ))
    .add('Disable Header', () => (
        <InfiniteCalendar
            displayOptions={{
                showHeader: false,
            }}
        />
    ))
    .add('Disable Header Animation', () => (
        <InfiniteCalendar
            displayOptions={{
                shouldHeaderAnimate: false,
            }}
        />
    ))
    .add('Disable Month Overlay', () => (
        <InfiniteCalendar
            displayOptions={{
                showOverlay: false,
            }}
        />
    ))
    .add('Disable Floating Today Helper', () => (
        <InfiniteCalendar
            displayOptions={{
                showTodayHelper: false,
            }}
        />
    ))
    .add('Hide Months in Year Selection', () => (
        <InfiniteCalendar
            display={'years'}
            displayOptions={{
                showMonthsForYears: false,
            }}
        />
    ))
    .add('Hide Weekdays Helper', () => (
        <InfiniteCalendar
            displayOptions={{
                showWeekdays: false,
            }}
        />
    ));

storiesOf('Events', module)
    .add('On Select', () => (
        <InfiniteCalendar
            onSelect={date =>
                alert(`You selected: ${format(date, 'ddd, MMM Do YYYY')}`)}
        />
    ))
    .add('On Scroll', () => [
        <label key="label">Check your console logs.</label>,
        <InfiniteCalendar
            key="calendar"
            onScroll={scrollTop =>
                console.info('onScroll() – Scroll top:', scrollTop)}
        />,
    ]);
