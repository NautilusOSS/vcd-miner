export default {
  name: "SlotMachine",
  desc: "\n    A simple slot machine smart contract\n    ",
  methods: [
    {
      name: "post_upgrade",
      args: [],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Called after upgrade",
    },
    {
      name: "set_min_bank_amount",
      args: [
        {
          type: "uint64",
          name: "min_bank_amount",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Set the minimum bank amount",
    },
    {
      name: "set_payout_model",
      args: [
        {
          type: "uint64",
          name: "app_id",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Set the payout model",
    },
    {
      name: "set_min_bet_amount",
      args: [
        {
          type: "uint64",
          name: "min_bet_amount",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Set the minimum bet amount",
    },
    {
      name: "set_max_bet_amount",
      args: [
        {
          type: "uint64",
          name: "max_bet_amount",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Set the maximum bet amount",
    },
    {
      name: "burn_upgreadable_fuse",
      args: [],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Burn the upgradeable fuse",
    },
    {
      name: "burn_stakeable_fuse",
      args: [],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Burn the stakeable fuse",
    },
    {
      name: "burn_deletable_fuse",
      args: [],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Burn the deletable fuse",
    },
    {
      name: "owner_deposit",
      args: [
        {
          type: "uint64",
          name: "amount",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Deposit funds into the contract",
    },
    {
      name: "get_owner",
      args: [],
      readonly: false,
      returns: {
        type: "address",
      },
      desc: "Get the owner of the contract",
    },
    {
      name: "deposit",
      args: [],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Deposit funds into the contract",
    },
    {
      name: "withdraw",
      args: [
        {
          type: "uint64",
          name: "amount",
          desc: "The amount of funds to withdraw in atomic units",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Withdraw funds from the contract\nOnly callable by contract owner",
    },
    {
      name: "get_balance_available",
      args: [],
      readonly: true,
      returns: {
        type: "uint64",
      },
      desc: "Get the available balance",
    },
    {
      name: "get_balance_locked",
      args: [],
      readonly: true,
      returns: {
        type: "uint64",
      },
      desc: "Get the locked balance",
    },
    {
      name: "get_balance_total",
      args: [],
      readonly: true,
      returns: {
        type: "uint64",
      },
      desc: "Get the total balance",
    },
    {
      name: "get_bet_key",
      args: [
        {
          type: "address",
          name: "address",
        },
        {
          type: "uint64",
          name: "amount",
        },
        {
          type: "uint64",
          name: "round",
        },
        {
          type: "uint64",
          name: "index",
        },
      ],
      readonly: true,
      returns: {
        type: "byte[56]",
      },
    },
    {
      name: "kill",
      args: [],
      readonly: false,
      returns: {
        type: "void",
      },
      desc: "Kill the contract",
    },
    {
      name: "spin",
      args: [
        {
          type: "uint64",
          name: "bet_amount",
        },
        {
          type: "uint64",
          name: "index",
          desc: "Player's choice of index.",
        },
      ],
      readonly: false,
      returns: {
        type: "byte[56]",
        desc: "r (uint): The round number of the spin.",
      },
      desc: "Spin the slot machine. Outcome is determined by the seed\nof future round.",
    },
    {
      name: "claim",
      args: [
        {
          type: "byte[56]",
          name: "bet_key",
          desc: "The key of the bet to claim",
        },
      ],
      readonly: false,
      returns: {
        type: "uint64",
        desc: "The payout for the bet",
      },
      desc: "Claim a bet",
    },
    {
      name: "transfer",
      args: [
        {
          type: "address",
          name: "new_owner",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
    },
    {
      name: "set_version",
      args: [
        {
          type: "uint64",
          name: "contract_version",
        },
        {
          type: "uint64",
          name: "deployment_version",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
    },
    {
      name: "approve_update",
      args: [
        {
          type: "bool",
          name: "approval",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
    },
    {
      name: "grant_upgrader",
      args: [
        {
          type: "address",
          name: "upgrader",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
    },
    {
      name: "set_delegate",
      args: [
        {
          type: "address",
          name: "delegate",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
    },
    {
      name: "participate",
      args: [
        {
          type: "byte[32]",
          name: "vote_k",
        },
        {
          type: "byte[32]",
          name: "sel_k",
        },
        {
          type: "uint64",
          name: "vote_fst",
        },
        {
          type: "uint64",
          name: "vote_lst",
        },
        {
          type: "uint64",
          name: "vote_kd",
        },
        {
          type: "byte[64]",
          name: "sp_key",
        },
      ],
      readonly: false,
      returns: {
        type: "void",
      },
    },
  ],
  events: [
    {
      name: "BetPlaced",
      args: [
        {
          type: "address",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
      ],
    },
    {
      name: "BetClaimed",
      args: [
        {
          type: "address",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
        {
          type: "uint64",
        },
      ],
    },
  ],
};
