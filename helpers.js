
const tweetsOfAjay = await client.v2.userTimeline('1532967152005058560', { exclude: 'replies', });
await client.v2.reply(
    'Golu Replying here...',
    tweetsOfAjay._realData.data[0].id,
  );
  since_id: 1537135288316592131
await client.v2.like('1532967152005058560', tweetsOfAjay._realData.data[0].id);