import User from "../models/User.js";
export const getUserProfileAndRepos = async (req, res) => {
	const { username } = req.params;
	try {
		// 60 requests per hour, 5000 requests per hour for authenticated requests
		// https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
		const userRes = await fetch(`https://api.github.com/users/${username}`, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});

		if (userRes.status === 404) {
			return res.status(404).json({ message: "User not found" });
		}

		const userProfile = await userRes.json();

		const repoRes = await fetch(userProfile.repos_url, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});
		const repos = await repoRes.json();

		res.status(200).json({ userProfile, repos });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const likeProfile = async (req, res) => {
	
	try {

		const { username } = req.params;
		const user = await User.findById(req.user._id.toString());

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const userToLike = await User.findOne({ username: username });
		if(!userToLike){
			return res.status(404).json({ message: "User to like not found" });
		}

		if(user.likedProfiles.includes(username)){
			return res.status(400).json({ message: "User already liked" });
		}

		userToLike.likedBy.push({
			username: user.username,
			avatarUrl: user.avatarUrl,
		});
		user.likedProfiles.push(userToLike.username);
		await Promise.all([userToLike.save(), user.save()]);
		return res.status(200).json({ message: "User liked" });
		
		
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
export const getLikes = async (req, res) => {
	try {
		const user = await User.findById(req.user._id.toString());
		return res.status(200).json({ likedBy: user.likedBy });

	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}