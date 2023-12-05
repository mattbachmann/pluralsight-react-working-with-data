import React, { useEffect } from "react";
import useSpeakerSortAndFilter from "@/app/speakers/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { useSpeakerMenuContext } from "@/components/contexts/speaker-menu-context";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import { Speaker } from "@/lib/general-types";
import {useSpeakerDataContext} from "@/components/contexts/speaker-data-context";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();
  const { speakerList, loadingStatus, error } = useSpeakerDataContext();


  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

  if (loadingStatus === "loading") {
    return (
      <>
        {[1, 2, 3, 4, 5].map((item) => {
          return <SpeakerDetailPending key={item} />;
        })}
        <div className="mt-3"></div>
      </>
    );
  }

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  return (
    <>
      {speakerListFiltered.map(function (speakerRec) {


        if (!speakerRec) {
          debugger;
          console.log("speakers-list: speakerRec is null");
        }

        return (
          <SpeakerDetail
            key={speakerRec.id}
            speakerId = {speakerRec.id}
          />
        );
      })}
      <div className="mt-3"></div>
    </>
  );
}
