import React, {PureComponent} from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import styles from './Day.scss';

export default class Day extends PureComponent {
  handleClick = () => {
    let {date, isDisabled, onClick} = this.props;

    if (!isDisabled && typeof onClick === 'function') {
      onClick(parse(date));
    }
  };

  renderSelection(selectionColor) {
    const {
      day,
      date,
      isToday,
      locale: {todayLabel},
      monthShort,
      theme: {textColor},
      selectionStyle,
    } = this.props;

    return (
      <div
        className={styles.selection}
        data-date={date}
        style={{
          backgroundColor: this.selectionColor,
          color: textColor.active,
          ...selectionStyle,
        }}
      >
        <span className={styles.month}>
          {isToday ? todayLabel.short || todayLabel.long : monthShort}
        </span>
        <span className={styles.day}>{day}</span>
      </div>
    );
  }

  renderDateHint = ()=> {
    var {
      date,
      day,
      year,
      currentYear,
      renderDateHint
    } = this.props

    if(renderDateHint) {
      return renderDateHint(new Date(date), styles.hint)
    }

    /*return day === 1 &&
        currentYear !== year &&
        <span className={styles.year}>{year}</span>*/
    return null
  }
  
  render() {
    const {
      className,
      currentYear,
      date,
      day,
      handlers,
      isDisabled,
      isHighlighted,
      isToday,
      isSelected,
      monthShort,
      renderDateHint,
      theme: {selectionColor, todayColor},
      year,
    } = this.props;
    let color;

    if (isSelected) {
      color = this.selectionColor = typeof selectionColor === 'function'
        ? selectionColor(date)
        : selectionColor;
    } else if (isToday) {
      color = todayColor;
    }

    return (
      <li
        style={color ? {color} : null}
        className={classNames(styles.root, {
          [styles.today]: isToday,
          [styles.highlighted]: isHighlighted,
          [styles.selected]: isSelected,
          [styles.disabled]: isDisabled,
          [styles.enabled]: !isDisabled,
        }, className)}
        onClick={this.handleClick}
        data-date={date}
        {...handlers}
      >
        {day === 1 && <span className={styles.month}>{monthShort}</span>}
        {isToday ? <span>{day}</span> : day}
        {this.renderDateHint()}
        {isSelected && this.renderSelection()}
      </li>
    );
  }
}
