import useCases from "../hooks/useCases";
import useClient from "../hooks/useClient";
import { Link } from "react-router-dom";

type ClientNameType = {
  first: string;
  last: string;
};

type CasesProps = {
  id: number | undefined;
};

const CaseListSideBar = ({ id }: CasesProps) => {
  const { nameLoading, clientName, nameError } = useClient({ id });
  const { loading, cases, error } = useCases({ id });

  return (
    <div className="case-list-sidebar">
      <h2 className="case-list-sidebar-title">CASE LIST</h2>
      {(loading || nameLoading) && id ? (
        <div>Loading cases...</div>
      ) : clientName && id ? (
        <div>
          <h3 className="case-list-sidebar-name">
            {clientName?.lastName}, {clientName?.firstName}
          </h3>

          {cases && cases.length > 0 ? (
            cases?.map((c) => {
              return (
                <Link
                  to={`/case/${c.clientId}/${c.id}`}
                  className="sidebar-case-link"
                  key={c.id}
                >
                  <div className="sidebar-case">
                    <div className="sidebar-case-name">{c.name}</div>
                    <div className="sidebar-case-number">{c.caseNumber}</div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>No cases on file</div>
          )}
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default CaseListSideBar;
