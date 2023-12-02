import React from "react";
import { SpeakerModalProvider } from "@/components/contexts/speaker-modal-context";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";
import FavoriteSpeakerToggle from "@/app/speakers/favorite-speaker-toggle";
import EditSpeakerDialog from "@/app/speakers/edit-speaker-dialog";
import DeleteSpeakerButton from "@/app/speakers/delete-speaker-button";
import {Speaker} from "@/lib/general-types";

export default function SpeakerDetail({
  speakerRec,
  deleteSpeaker,
  updateSpeaker,
  createSpeaker,
}: {
  speakerRec: any;
  deleteSpeaker: (id: number) => void;
  updateSpeaker: (speaker: Speaker) => void;
  createSpeaker: (speaker: Speaker) => void;
}) {

  const handleImageError = (e : any) => {
    e.target.src = "/images/speaker-pending.png"; // Path to your default image
  };

  return (
    <SpeakerModalProvider>
      {speakerRec && <SpeakerModal updateSpeaker={updateSpeaker} createSpeaker={createSpeaker} />}
      <div className="col-xl-6 col-md-12">
        <div className="card border-0 h-100">
          <div className="row g-0">
            <div className="col-4">
              <img
                src={`/images/speaker-${speakerRec.id}.jpg`}
                width={200}
                height={200}
                className="img-fluid speaker-rounded-corners speaker-image"
                alt={`${speakerRec?.firstName} ${speakerRec?.lastName}`}
                onError={handleImageError}
              />
            </div>

            <div className="col-8 d-flex flex-column flex-nowrap">
              <div className="card-body">
                <div className="speaker-action d-flex">
                  <div className="favoriteToggleWrapper">
                    <FavoriteSpeakerToggle speakerRec={speakerRec} />
                  </div>

                  <div className="modifyWrapper">
                    <EditSpeakerDialog {...speakerRec}  />
                    <DeleteSpeakerButton
                      id={speakerRec.id}
                      deleteSpeaker={deleteSpeaker}
                    />
                  </div>
                </div>
                <h4 className="card-title">
                  {speakerRec.firstName} {speakerRec.lastName}
                </h4>
                <p className="card-text">{speakerRec.userBioShort}</p>
              </div>

              <div className="card-footer text-muted d-flex flex-wrap justify-content-between align-items-center">
                {speakerRec?.company?.length > 0 && (
                  <small>
                    <strong>Company:</strong> {speakerRec.company}
                  </small>
                )}

                {speakerRec.twitterHandle.length > 0 && (
                  <small>
                    <strong>Twitter</strong>: {speakerRec.twitterHandle}
                  </small>
                )}

                {speakerRec.timeSpeaking && (
                  <small>
                    <strong>Time Speaking:</strong> {new Date(speakerRec.timeSpeaking).toLocaleString()}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpeakerModalProvider>
  );
}
