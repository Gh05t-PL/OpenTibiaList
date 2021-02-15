import React from "react";

const getStepArray = (pages) => {
  let arr = []
  for (let i = Math.ceil(pages / 2); i < pages + Math.ceil(pages / 2); i++) {
    arr.push((pages - i) * -1)
  }
  return arr;
}

/**
 *
 * @param pages {number} count of pages
 * @param page {number} current page
 * @param buttonsCount {number} should be odd number
 * @param setPage {function}
 *
 * @returns {JSX.Element}
 *
 * @constructor
 */
const Pagination = ({pages, page, buttonsCount, setPage}) => {

  let steps = getStepArray(buttonsCount)

  let distanceToLeft = Math.abs(1 - page);
  let distanceToRight = Math.max(buttonsCount, pages) - page + 1;
  let middle = Math.ceil(buttonsCount / 2);

  if (distanceToLeft < middle) {
    let toRemove = middle - distanceToLeft - 1;
    steps.splice(0, toRemove);

    let lastStep = steps[steps.length - 1]

    for (let i = 0; i < toRemove; i++) {
      steps.push(++lastStep);
    }
  } else if (distanceToRight < middle) {
    let toRemove = middle - distanceToRight;
    steps.reverse().splice(0, toRemove);
    steps.reverse();

    let lastStep = steps[0]

    for (let i = 0; i < toRemove; i++) {
      steps.unshift(--lastStep);
    }
  }

  let isFirst = page === 1;
  let isLast = page === pages;

  return (
    <ul className="pagination">
      <li className={!isFirst ? "page-item cursor-pointer" : "page-item disabled cursor-disabled"}><a
        className="page-link" onClick={() => !isFirst && setPage(1)}>First</a></li>
      <li className={!isFirst ? "page-item cursor-pointer" : "page-item disabled cursor-disabled"}><a
        className="page-link" onClick={() => !isFirst && setPage(page - 1)}>&laquo;</a></li>
      {steps.map((item, idx) => {
        return (
          <li
            className={item === 0 ? "page-item cursor-disabled active" : (idx + 1 > pages) ? "page-item cursor-disabled disabled" : "page-item cursor-pointer"}>
            <a
              className="page-link" onClick={() => setPage(page + item)}>{page + item}</a>
          </li>
        )
      })}
      <li className={!isLast ? "page-item cursor-pointer" : "page-item disabled cursor-disabled"}><a
        className="page-link" onClick={() => !isLast && setPage(page + 1)}>&raquo;</a></li>
      <li className={!isLast ? "page-item cursor-pointer" : "page-item disabled cursor-disabled"}><a
        className="page-link" onClick={() => !isLast && setPage(pages)}>Last</a></li>
    </ul>
  )
}

export default Pagination;