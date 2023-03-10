import { async } from '@firebase/util'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { Community } from '../../../atoms/communitiesAtom'
import { firestore } from '../../../firebase/clientApp'
import safeJsonStringify from 'safe-json-stringify'
import NotFound from '../../../components/Community/NotFound'
import Header from '../../../components/Community/Header'

type CommunityPageProps = {
  communityData: Community
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log('here is data', communityData)

  if (!communityData) {
    return <NotFound />
  }

  return (
    <>
      <Header communityData={communityData} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get communityy data and pass it to client

  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string,
    )

    const communityDoc = await getDoc(communityDocRef)
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              }),
            )
          : '',
      },
    }
  } catch (error) {}
}

export default CommunityPage
