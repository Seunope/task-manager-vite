import { FaStar } from 'react-icons/fa6';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PriceRange() {
  return (
    <>
      <div className="px-4 py-3 text-xs space-y-2 sm:min-w-48 bg-WHITE">
        <p className="mb-3 font-semibold flex justify-between items-center">
          Price <FontAwesomeIcon icon={faMinus} />
        </p>
        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="price"
          />
          <label className="" htmlFor="<5000">
            &#8358;5,000
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="price"
          />
          <label className="" htmlFor="<5000">
            &#8358;5,000 - &#8358;10,000
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="price"
          />
          <label className="" htmlFor="<5000">
            &#8358;10,000 - &#8358;20,000
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="price"
          />
          <label className="" htmlFor="<5000">
            &#8358;20,000 - &#8358;30,000
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="price"
          />
          <label className="" htmlFor="<5000">
            &#8358;30,000 - &#8358;40,000
          </label>
        </div>
      </div>
      <div className="px-4 pt-3 pb-6 text-xs space-y-2 sm:min-w-40 bg-WHITE">
        <p className="mb-3 font-semibold flex items-center justify-between">
          Custom Price Range
          <FontAwesomeIcon icon={faMinus} />
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="&#8358; Min"
            className="w-16 text-xs border-PRIMARY border-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="&#8358; Max"
            className="w-16 text-xs border-PRIMARY border-2 rounded-lg"
          />
          <button className="border-PRIMARY border-2 w-10 rounded-lg  font-semibold">Go</button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-6 text-xs space-y-2 sm:min-w-40 bg-WHITE">
        <p className="mb-3 font-semibold flex items-center justify-between">
          Rating <FontAwesomeIcon icon={faMinus} />
        </p>
        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="rating"
          />
          <label htmlFor="<5000">
            <div className="flex items-center justify-start rounded-sm px-1  bg-WHITE text-BLACK">
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
            </div>
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="rating"
          />
          <label className="flex items-center gap-1" htmlFor="<5000">
            <div className="flex items-center justify-start rounded-sm px-1  bg-WHITE text-BLACK">
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{' '}
            & Up
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="rating"
          />
          <label className="flex items-center gap-1" htmlFor="<5000">
            <div className="flex items-center justify-start rounded-sm px-1  bg-WHITE text-BLACK">
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{' '}
            & Up
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="rating"
          />
          <label className="flex items-center gap-1" htmlFor="<5000">
            <div className="flex items-center justify-start rounded-sm px-1  bg-WHITE text-BLACK">
              <FaStar className="text-YELLOW text-xs" />
              <FaStar className="text-YELLOW text-xs" />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{' '}
            & Up
          </label>
        </div>

        <div className="text-[0.65rem] flex items-center gap-1">
          <input
            type="radio"
            className="w-3 h-3 text-PRIMARY border-2"
            value="<5000"
            name="rating"
          />
          <label className="flex items-center gap-1" htmlFor="<5000">
            <div className="flex items-center justify-start rounded-sm px-1  bg-WHITE text-BLACK">
              <FaStar className="text-YELLOW text-xs" />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>{' '}
            & Up
          </label>
        </div>
      </div>
    </>
  );
}

export default PriceRange;
