import {
  useGetAllDesignsQuery,
  useLazyGetAllDesignsQuery,
} from "@/lib/redux/rtkapi/gaimizApi";

import { ArrowBigDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Gallary = ({
  onImgClick,
  selectedName,
}: {
  onImgClick: (img: Design) => void;
  selectedName?: string | null;
}) => {
  const [getAllDesigns, allDesigns] = useLazyGetAllDesignsQuery();
  const [totalPage, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = 3;
  React.useEffect(() => {
    getAllDesigns({ nextid: undefined, previd: undefined, limit: perPage });
  }, []);

  React.useEffect(() => {
    if (allDesigns.data) {
      let pageCount = Math.floor(allDesigns.data.count / perPage);
      if (allDesigns.data.count % perPage !== 0) {
        pageCount += 1;
      }
      setTotalPages(pageCount);
    }
  }, [allDesigns.data]);

  const NextPage = (nexid: string) => {
    getAllDesigns({ nextid: nexid, previd: undefined, limit: perPage });
  };
  const PrevPage = (previd: string) => {
    getAllDesigns({ nextid: undefined, previd: previd, limit: perPage });
  };
  return (
    <div className="">
      <>
        {!allDesigns?.data?.data ? (
          <>err</>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col">
              {allDesigns.isLoading || allDesigns.isFetching ? (
                <div className="flex items-center justify-center h-[66vh] ">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <>
                  {" "}
                  {allDesigns.data.data.map((design, id) => (
                    <img
                      key={id}
                      className={`h-[22vh] ${
                        design.name === selectedName
                          ? "border-cyan-500"
                          : "border-transparent"
                      } border-2`}
                      onClick={() => {
                        onImgClick(design);
                      }}
                      alt={id.toString()}
                      src={design.downloadPath}
                    />
                  ))}
                </>
              )}
            </div>
            <div className="flex items-center justify-center gap-4 p-4 rounded-full bg-background ">
              <div>
                <Button
                  disabled={
                    currentPage === 1 ||
                    allDesigns.isLoading ||
                    allDesigns.isFetching
                  }
                  variant={"default"}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    if (allDesigns.data?.firstDoc)
                      PrevPage(allDesigns.data.firstDoc);
                  }}
                  className="w-12 h-12 p-2 rounded-full"
                >
                  <ChevronLeft size={24} />
                </Button>
              </div>
              <div className="flex items-center justify-center w-24 text-lg font-black">
                {currentPage}
              </div>
              <div>
                <Button
                  disabled={
                    currentPage === totalPage ||
                    allDesigns.isLoading ||
                    allDesigns.isFetching
                  }
                  variant={"default"}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    if (allDesigns.data?.lastDoc)
                      NextPage(allDesigns.data.lastDoc);
                  }}
                  className="w-12 h-12 p-2 rounded-full"
                >
                  <ChevronRight size={24} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Gallary;
