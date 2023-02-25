import useCases from "../../hooks/useCases";
import useClient from "../../hooks/useClient";
import { Link } from "react-router-dom";
import CaseList from "../CaseList/CaseList";

type ClientNameType = {
  first: string;
  last: string;
};

type CasesProps = {
  id: number | undefined;
};

const CaseListSideBar = ({ id }: CasesProps) => {
  const { nameLoading, clientName, nameError } = useClient(id);
  const { loading, cases, error } = useCases(id);

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
          <CaseList cases={cases} />
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default CaseListSideBar;
