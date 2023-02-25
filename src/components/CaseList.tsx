import { Case } from "../types";
import { Link } from "react-router-dom";

type Props = {
  cases: Case[] | null;
  classNamePrefix?: string;
};

const CaseList = ({ cases, classNamePrefix }: Props) => {
  return (
    <>
      {cases && cases.length > 0 ? (
        cases?.map((c) => {
          return (
            <Link
              to={`/case/${c.clientId}/${c.id}`}
              className={`${
                classNamePrefix ? classNamePrefix + "-" : ""
              }sidebar-case-link`}
              key={c.id}
            >
              <div
                className={`${
                  classNamePrefix ? classNamePrefix + "-" : ""
                }sidebar-case`}
              >
                <div
                  className={`${
                    classNamePrefix ? classNamePrefix + "-" : ""
                  }sidebar-case-name`}
                >
                  {c.name}
                </div>
                <div
                  className={`${
                    classNamePrefix ? classNamePrefix + "-" : ""
                  }sidebar-case-number`}
                >
                  {c.caseNumber}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div>No cases on file</div>
      )}
    </>
  );
};

export default CaseList;
