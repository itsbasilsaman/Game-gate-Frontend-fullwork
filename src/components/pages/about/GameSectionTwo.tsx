import React from 'react';
 
interface GameSectionOneProps {
  description: string | null;

}



const GameSectionThree: React.FC<GameSectionOneProps> = React.memo(({description}) => {
  return (
    <main className='w-full h-auto   md:px-[80px] px-[20px] lg:mt-[20px]'>
       <div className='about-coc w-full  lg:py-[42px] py-[36px] rounded-[16px] text-white lg:px-[35px] px-[25px]' >
          <h1 style={{fontFamily:'Unbounded'}} className='text-[22px] pb-[17px]'>Description</h1>
          <p>{description}</p>
          <h1 style={{fontFamily:'Unbounded'}} className='text-[22px] pb-[17px]'>
            {/* About COC */}
            </h1>
          <p className='pb-[17px]'>
            {/* COC is a mobile strategy game that is free to play. The game was released in 2012 for iOS and in 2013 for the Android platform. */}
            </p>
          <p className='pb-[17px]'>
            {/* It combines strategy with fast-paced combat. COC players can join or set up a clan and build an army of Barbarians, War Wizards, Dragons, and more to defeat the Goblin King and other clans. */}
            </p>
          <p className='pb-[17px]'>
            {/* COC has often been regarded as one of the best mobile games, winning many awards, such as Best Social Game by IMGA. This is also proven by the number of gamers, around 120 million of them, who still play the game although it was released almost a decade ago. */}
            </p>
          <h1 style={{fontFamily:'Unbounded'}} className='text-[22px] pb-[17px]' >
            {/* How to Top Up your COC Gems on Brand */}
            </h1>
          <p className='lg:pb-[17px]'>
            {/* Here is how to top up your COC gems on Brand: */}
            </p>
          <p className='lg:pb-[4px]'>
            {/* 1. Sign in to your Brand account or register a new account if you don't have one. */}
            </p>
          <p className='lg:pb-[4px]'>
            {/* 2. Choose from the various COC gems denomination that you need, then click "Buy Now". */}
            </p>
          <p className='lg:pb-[4px]'>
            {/* 3. Don't forget to contact the seller to discuss the purchasing details. */}
            </p>
          <p className='lg:pb-[4px]'>
            {/* 4. Provide your COC username and server to the seller to proceed the top up. */}
            </p>
          <p className='lg:pb-[4px]'>
            {/* 5. Select a payment method you prefer. */}
            </p>
          <p>
            {/* 6. Finally, complete the transaction. */}
            </p>
       </div> 
    </main>
  );
});

export default GameSectionThree;
