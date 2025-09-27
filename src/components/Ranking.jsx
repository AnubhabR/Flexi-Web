import React, { useState, useEffect } from "react";
import { Trophy, Medal, Award, TrendingUp, Star, Crown } from "lucide-react";

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/api/ranking", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRankings(data);
        setCurrentUser(data.find((user) => user.isCurrentUser));
        setError(null);
      } catch (err) {
        console.error("Error fetching rankings:", err);
        setError("Failed to load rankings");
        // Fallback to mock data
        const mockRankings = [
          {
            _id: 1,
            name: "Alice Johnson",
            totalScore: 2450,
            quizzesTaken: 25,
            averageScore: 98,
            avatar: "👩‍💻",
            isCurrentUser: false,
            rank: 1,
          },
          {
            _id: 2,
            name: "Bob Smith",
            totalScore: 2380,
            quizzesTaken: 23,
            averageScore: 96,
            avatar: "👨‍💼",
            isCurrentUser: false,
            rank: 2,
          },
          {
            _id: 5,
            name: "Utso",
            totalScore: 2180,
            quizzesTaken: 21,
            averageScore: 90,
            avatar: "👨‍💻",
            isCurrentUser: true,
            rank: 5,
          },
        ];
        setRankings(mockRankings);
        setCurrentUser(mockRankings.find((user) => user.isCurrentUser));
      } finally {
        setLoading(false);
        setTimeout(() => setAnimationComplete(true), 500);
      }
    };

    fetchRankings();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRankingCardClass = (rank, isCurrentUser) => {
    let baseClass =
      "relative p-6 rounded-xl shadow-lg transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl";

    if (rank <= 3) {
      baseClass += " bg-gradient-to-r";
      switch (rank) {
        case 1:
          baseClass +=
            " from-yellow-100 to-yellow-200 border-2 border-yellow-300";
          break;
        case 2:
          baseClass += " from-gray-100 to-gray-200 border-2 border-gray-300";
          break;
        case 3:
          baseClass += " from-amber-100 to-amber-200 border-2 border-amber-300";
          break;
      }
    } else {
      baseClass += isCurrentUser
        ? " bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300"
        : " bg-white border border-gray-200";
    }

    return baseClass;
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          {error} - Showing sample data
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-600 text-lg">
          See how you rank against other students
        </p>
      </div>

      {/* Current User Stats Card */}
      {currentUser && (
        <div
          className={`mb-8 transform transition-all duration-700 ${
            animationComplete
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{currentUser.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold">Your Current Rank</h3>
                  <p className="text-blue-100">
                    Keep it up, {currentUser.name}!
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">#{currentUser.rank}</div>
                <div className="text-blue-100 text-sm">
                  out of {rankings.length}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {currentUser.totalScore}
                </div>
                <div className="text-blue-100 text-sm">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {currentUser.quizzesTaken}
                </div>
                <div className="text-blue-100 text-sm">Quizzes Taken</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {currentUser.averageScore}%
                </div>
                <div className="text-blue-100 text-sm">Average Score</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Podium */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🥇 Top Performers
        </h2>
        <div className="flex justify-center items-end space-x-4">
          {rankings.slice(0, 3).map((user, index) => {
            const rank = index + 1;
            const heights = ["h-40", "h-48", "h-36"]; // 2nd, 1st, 3rd
            const orders = [1, 0, 2]; // Reorder to put 1st in middle
            const actualIndex = orders.indexOf(index);

            return (
              <div
                key={user._id}
                className={`transform transition-all duration-1000 ${
                  animationComplete
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${actualIndex * 200}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 relative">
                    <div
                      className="text-4xl animate-bounce"
                      style={{ animationDelay: `${actualIndex * 300}ms` }}
                    >
                      {user.avatar}
                    </div>
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(rank)}
                    </div>
                  </div>
                  <div
                    className={`${getRankingCardClass(
                      rank,
                      user.isCurrentUser
                    )} ${
                      heights[index]
                    } w-32 flex flex-col justify-end items-center`}
                  >
                    <div className="text-center mb-2">
                      <div className="font-bold text-lg">{rank}</div>
                      <div className="text-sm font-medium truncate w-24">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {user.totalScore} pts
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Rankings List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
          <h2 className="text-xl font-bold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Complete Rankings
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {rankings.map((user, index) => (
            <div
              key={user._id}
              className={`transform transition-all duration-500 hover:bg-gray-50 ${
                animationComplete
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`p-4 flex items-center justify-between ${
                  user.isCurrentUser
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(user.rank)}
                    <span className="text-xl font-bold text-gray-700">
                      #{user.rank}
                    </span>
                  </div>

                  <div className="text-3xl">{user.avatar}</div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {user.name}
                      </h3>
                      {user.isCurrentUser && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {user.quizzesTaken} quizzes completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800">
                      {user.totalScore}
                    </div>
                    <div className="text-xs text-gray-500">Total Points</div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600">
                      {user.averageScore}%
                    </div>
                    <div className="text-xs text-gray-500">Average</div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(user.averageScore / 20)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Your Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium">Quiz Master</div>
            <div className="text-xs text-gray-500">Complete 20+ quizzes</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium">Speed Runner</div>
            <div className="text-xs text-gray-500">Fast completion times</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-sm font-medium">Knowledge Seeker</div>
            <div className="text-xs text-gray-500">High accuracy rate</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-sm font-medium">On Fire</div>
            <div className="text-xs text-gray-500">5-day streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
